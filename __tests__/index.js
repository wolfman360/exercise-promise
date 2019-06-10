const {
  analysis,
  driverReport
} = require('../src/index');

describe('analysis spec', () => {
  test('matches the required data format', async () => {
    const data = await analysis();

    expect(data).toEqual({
      noOfCashTrips: expect.any(Number),
      noOfNonCashTrips: expect.any(Number),
      billedTotal: expect.any(Number),
      cashBilledTotal: expect.any(Number),
      nonCashBilledTotal: expect.any(Number),
      noOfDriversWithMoreThanOneVehicle: expect.any(Number),
      mostTripsByDriver: {
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        noOfTrips: expect.any(Number),
        totalAmountEarned: expect.any(Number)
      },
      highestEarningDriver: {
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        noOfTrips: expect.any(Number),
        totalAmountEarned: expect.any(Number)
      }
    });
  });

  test('analysis solution', async () => {
    const data = await analysis();

    expect(data).toMatchObject({
      noOfCashTrips: 26,
      noOfNonCashTrips: 24,
      billedTotal: 128224.69,
      cashBilledTotal: 69043.8,
      nonCashBilledTotal: 59180.89
    });
  });
});


describe('driver report test', () => {
  beforeEach(async () => {
    report = await driverReport(); 
   });
  test('expects driverReport to be Defined',  () => {
     expect(driverReport).toBeDefined();
  });

    test('should return nine',  () => {
      expect(report).toHaveLength(9);
    });

    test('expects driverReport to return array of an object with certain properties',  () => {
   
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


