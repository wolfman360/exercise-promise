const analysis= require('../src/analysis');

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




