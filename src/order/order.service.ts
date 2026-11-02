import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { productId, quantity } = createOrderDto;

    return await this.dataSource.transaction(async (manager) => {
        // 1. Lock the product row for update to prevent race conditions
        const product = await manager.findOne(Product, {
          where: { id: productId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        // 2. Verify stock
        if (product.stock < quantity) {
          throw new BadRequestException(
            `Insufficient stock. Available: ${product.stock}, requested: ${quantity}`,
          );
        }

        // 4. Calculate total price safely on backend
        const unitPrice =
          Number(product.price) * (1 - (product.discount ?? 0) / 100);
        const calculatedTotal = Number((unitPrice * quantity).toFixed(2));

        // 5. Decrement stock
        product.stock -= quantity;
        await manager.save(Product, product);

        // 6. Create & persist the order
        const order = manager.create(Order, {
          ...createOrderDto,
          status: createOrderDto.status as OrderStatus,
          total: createOrderDto.total ?? calculatedTotal,
        });

        return await manager.save(Order, order);
      });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: { product: true },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const updated = this.orderRepository.merge(order, {
      ...updateOrderDto,
      status: updateOrderDto.status as OrderStatus | undefined,
    });
    return await this.orderRepository.save(updated);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return { message: `Order #${id} successfully removed` };
  }
}
