const driverReport = require("../src/driver-report.js");

describe('driver report test', () => {
  beforeEach(async () => {
    report = await driverReport();
  });
  test('expects driverReport to be Defined', () => {
    expect(driverReport).toBeDefined();
  });

  test('should return nine', () => {
    expect(report).toHaveLength(9);
  });

  test('expects driverReport to return array of an object with certain properties', () => {

    expect(report).toContainEqual({
      fullName: expect.any(String),
      id: expect.any(String),
      phone: expect.any(String),
      noOfTrips: expect.any(Number),
      noOfVehicles: expect.any(Number),
      vehicles: expect.any(Array),
      noOfCashTrips: expect.any(Number),
      noOfNonCashTrips: expect.any(Number),
      totalAmountEarned: expect.any(Number),
      totalCashAmount: expect.any(Number),
      totalNonCashAmount: expect.any(Number),
      trips: expect.any(Array)

    });
  });
});
