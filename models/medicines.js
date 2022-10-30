const mongoose = require('mongoose');

const MedicinesSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
    unique: true,
  },
  medicinePrice: {
    type: Number,
    required: true,
  },
  medicineQuantity: {
    type: Number,
  },
});


MedicinesSchema.statics.isThisMedicineAlreadyAdded = async function (medicineName) {
  if (!medicineName) throw new Error('medicineName already exists');
  try {
    const medicine = await this.findOne({ medicineName });
    if (medicine) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};

module.exports = mongoose.model('Medicines', MedicinesSchema);