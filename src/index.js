/* eslint-disable */
const {
  getTrips,
  getVehicle,
  getDriver
} = require('./api/index.js');
/**
 * This function should return the trip data analysis
 * Don't forget to write tests
 *
 * @returns {any} Trip data analysis
 */

async function analysis() {
  let trips;
  let driversID;
  let unqieDriversID;
  let driverDetails = [];
  let allDriverDetails = new Map();
  try {
    trips = await getTrips();
    driversID = trips.map(currentValue => currentValue.driverID);
    unqieDriversID = [...new Set(driversID)];
  } catch (error) {
    console.error(error.message);
  }

  for (value of unqieDriversID) {
    try {
      let detail = await getDriver(value);
      driverDetails.push(detail);
      driverDetail = {
        ...detail
      };
      driverDetail['noOfTrips'] = 0;
      driverDetail['totalAmountEarned'] = 0;

      allDriverDetails.set(value, driverDetail);

    } catch (error) {
      console.log(error.message);
    }
  }
  let noOfDriversWithMoreThanOneVehicle = 0

  driverDetails.forEach(currentValue => {
    if (currentValue.vehicleID.length > 1) {
      noOfDriversWithMoreThanOneVehicle += 1;
    }
  });

  let skeleton = {
    "noOfCashTrips": 0,
    "noOfNonCashTrips": 0,
    "billedTotal": 0,
    "cashBilledTotal": 0,
    "nonCashBilledTotal": 0,
    noOfDriversWithMoreThanOneVehicle

  };
  let result = trips.reduce((accumulator, currentValue) => {
    let {
      isCash,
      billedAmount,
      driverID
    } = currentValue;
    let amount = typeof (billedAmount) === 'number' ? billedAmount : parseFloat(billedAmount.replace(/,/g, ''), 10);

    accumulator.billedTotal += amount;
    accumulator.billedTotal = parseFloat(accumulator.billedTotal.toFixed(2));
    if (isCash) {
      accumulator.noOfCashTrips += 1;
      accumulator.cashBilledTotal += amount;
      accumulator.cashBilledTotal = parseFloat(accumulator.cashBilledTotal.toFixed(2));


    } else {
      accumulator.noOfNonCashTrips += 1;
      accumulator.nonCashBilledTotal += amount;
      accumulator.nonCashBilledTotal = parseFloat(accumulator.nonCashBilledTotal.toFixed(2));
    }
    if (allDriverDetails.has(driverID)) {
      let details = allDriverDetails.get(driverID);
      details.noOfTrips += 1;
      details.totalAmountEarned += amount;
      let sortedTrips = [...allDriverDetails].sort((a, b) => b[1].noOfTrips - a[1].noOfTrips);
      let sortedAmount = [...allDriverDetails].sort((a, b) => b[1].totalAmountEarned - a[1].totalAmountEarned);
      let {
        name,
        email,
        phone,
        noOfTrips,
        totalAmountEarned
      } = sortedTrips[0][1];
      mostTripsByDriver = {
        name,
        email,
        phone,
        noOfTrips,
        totalAmountEarned
      };
      highestEarningDriver = {
        name: sortedAmount[0][1].name,
        email: sortedAmount[0][1].email,
        phone: sortedAmount[0][1].phone,
        noOfTrips: sortedAmount[0][1].noOfTrips,
        totalAmountEarned: sortedAmount[0][1].totalAmountEarned
      };
      accumulator['mostTripsByDriver'] = mostTripsByDriver;
      accumulator['highestEarningDriver'] = highestEarningDriver;



    }

    return accumulator;
  }, skeleton);
  return result;

}

/**
 * This function should return the data for drivers in the specified format
 * Don't forget to write tests
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
 let trips;
 let driversID;
 let unqieDriversID;
 let driverDetails = [];
 let allDriverDetails = new Map();
 let vehicleID = [];
 let vehicleDetails = new Map();
 try {
   trips = await getTrips();
   driversID = trips.map(currentValue => currentValue.driverID);
   unqieDriversID = [...new Set(driversID)];
 } catch (error) {
   console.error(error.message);
 }

 for (value of unqieDriversID) {
   try {
     detail = await getDriver(value);
     driverDetails.push(detail);
     driverDetail = {
       fullName: detail.name,
       id: value,
       phone: detail.phone,
       vehicleID: detail.vehicleID
     };
     driverDetail["noOfTrips"] = 0;
     driverDetail["noOfVehicles"] = detail.vehicleID.length;
     driverDetail["vehicles"] = [];
     driverDetail["noOfCashTrips"] = 0;
     driverDetail["noOfNonCashTrips"] = 0;
     driverDetail["totalAmountEarned"] = 0;
     driverDetail["totalCashAmount"] = 0;
     driverDetail["totalNonCashAmount"] = 0;
     driverDetail["trips"] = [];
     allDriverDetails.set(value, driverDetail);
   } catch (error) {
     console.log(error.message);
   }
 }
 trips.forEach(currentItem => {
   let {
     isCash,
     billedAmount,
     driverID,
     user,
     pickup,
     destination,
     created
   } = currentItem;
   let amount =
     typeof billedAmount === "number" ?
     billedAmount :
     parseFloat(billedAmount.replace(/,/g, ""), 10);
   if (allDriverDetails.has(driverID)) {
     detail = allDriverDetails.get(driverID);
     detail.totalAmountEarned += amount;
     detail.totalAmountEarned = parseFloat(
       detail.totalAmountEarned.toFixed(2)
     );
     detail.noOfTrips += 1;
     if (isCash) {
       detail.noOfCashTrips += 1;
       detail.totalCashAmount += amount;
       detail.totalCashAmount = parseFloat(detail.totalCashAmount.toFixed(2));
     } else {
       detail.noOfNonCashTrips += 1;
       detail.totalNonCashAmount += amount;
       detail.totalNonCashAmount = parseFloat(
         detail.totalNonCashAmount.toFixed(2)
       );
     }
     detail.trips.push({
       user: user.name,
       created,
       pickup: pickup.address,
       destination: destination.address,
       billed: parseFloat(amount.toFixed(2)),
       isCash
     });
   }
 });
 driverDetails.forEach(currentItem => {
   let [id1, ...idRest] = currentItem.vehicleID;
   vehicleID.push(id1, ...idRest);
 });
 for (value of vehicleID) {
   try {
     let vehicleDetail = await getVehicle(value);
     let {
       manufacturer,
       plate
     } = vehicleDetail;
     vehicleDetails.set(value, {
       manufacturer,
       plate
     });
   } catch (error) { console.error(error);}
 }
 report = [];
 for ([key, value] of allDriverDetails) {
   for (value2 of value.vehicleID) {
     if (vehicleDetails.has(value2) && allDriverDetails.has(key)) {
       carDetails = vehicleDetails.get(value2);
       driver = allDriverDetails.get(key);
       driver.vehicles.push(carDetails);
     }

   }
   delete value.vehicleID;
   report.push(value);

 }
 return report;
}
module.exports = {
  analysis,
  driverReport
};