import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateExpertsDto from './dtos/create-experts';
import UpdateExpertsDto from './dtos/update-experts';

@Injectable()
export class ExpertsService {
    constructor(private readonly prisma: PrismaService) {}

    async findExpertByEmail(email: string) {
        return await this.prisma.expert.findFirst({where: {
            email
        }
    });
    }

    async createExpert(data: CreateExpertsDto) {
        return await this.prisma.expert.create({
            data:{
                name: data.name,
                email: data.email,
                phone: data.phone
            }
        });
    }

    async findAllExperts() {
    return await this.prisma.expert.findMany();
    }

    async findExpertById(id: string) {
        return await this.prisma.expert.findFirst({where: {
            id
        }});
    }

    async updateExpert(id: string, data: UpdateExpertsDto) {
        await this.prisma.expert.update({where: {id}, data});
    }
}
