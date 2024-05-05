import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Education } from './enums/Education';
import { Income } from './enums/Income';
import { Vehicle } from './enums/Vehicle';
import { Gender } from './enums/Gender';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('insurance')
  @ApiQuery({ name: 'age', type: Number, required: true, description: 'Age of the applicant' })
  @ApiQuery({ name: 'gender', enum: Gender, required: true, description: 'Gender of the applicant' })
  @ApiQuery({ name: 'drivingExperience', type: Number, required: true, description: 'Years of driving experience' })
  @ApiQuery({ name: 'education', enum: Education, required: true, description: 'Educational background of the applicant' })
  @ApiQuery({ name: 'income', enum: Income, required: true, description: 'Income bracket of the applicant' })
  @ApiQuery({ name: 'vehicleYear', type: Number, required: true, description: 'Year of the vehicle' })
  @ApiQuery({ name: 'vehicleType', enum: Vehicle, required: true, description: 'Type of the vehicle' })
  @ApiQuery({ name: 'annualMileage', type: Number, required: true, description: 'Annual mileage of the vehicle' })
  @ApiResponse({ status: 200, description: 'The calculated insurance credit score', type: () => InsuranceResponse })
  async getInsurance(
    @Query('age') age: number,
    @Query('gender') gender: string,
    @Query('drivingExperience') drivingExperience: number,
    @Query('education') education: string,
    @Query('income') income: string,
    @Query('vehicleYear') vehicleYear: number,
    @Query('vehicleType') vehicleType: string,
    @Query('annualMileage') annualMileage: number,
  ) {
    const creditScore = await this.appService.calculateInsurance(
      age,
      gender,
      drivingExperience,
      education,
      income,
      vehicleYear,
      vehicleType,
      annualMileage
    );

    return { creditScore }
  }
}


class InsuranceResponse {
  creditScore: number
}