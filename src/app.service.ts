import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './service/database/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly db: PrismaService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async calculateInsurance(
    age: number,
    gender: string,
    drivingExperience: number,
    education: string,
    income: string,
    vehicleYear: number,
    vehicleType: string,
    annualMileage: number,
  ) {
    const ageValid = this.getYear(age);
    const drivingExperienceValid = this.getDrivingExperience(drivingExperience);
    const vehicleYearValid = this.getVehicleYear(vehicleYear);

    const insurance =  await this.db.insurance.findFirst({
      where: {
        age: ageValid,
        gender,
        drivingExperience: drivingExperienceValid,
        education,
        income,
        vehicleYear: vehicleYearValid,
        vehicleType,
        annualMileage: Number(annualMileage)
      }
    });

    return insurance.creditScore ?? 0;
  }

  private getDrivingExperience(drivingExperience: number): string {
    if (drivingExperience >= 0 && drivingExperience <= 9) {
      return '0-9y';
    }

    if (drivingExperience >= 20 && drivingExperience <= 29) {
      return '20-29y';
    }

    if (drivingExperience >= 10 && drivingExperience <= 19) {
      return '10-19y';
    }

    if (drivingExperience >= 30) {
      return '30y+';
    }

    throw new BadRequestException('Tempo de direção inválida, o tempo deve ser a cima de 0 anos');
  }

  private getVehicleYear(vehicleYear: number): string {
    if (vehicleYear >= 2015) {
      return 'after 2015';
    }

    return 'before 2015';
  }

  private getYear(age: number): string {
    if (age >= 16 && age <= 25) {
      return '16-25';
    }

    if (age >= 26 && age <= 39) {
      return '26-39';
    }

    if (age >= 40 && age <= 64) {
      return '40-64';
    }

    if (age >= 65) {
      return '65+';
    }

    throw new BadRequestException('Idade inválida, a idade deve ser a cima de 16 anos');
  }
}
