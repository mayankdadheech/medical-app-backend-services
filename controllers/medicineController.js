
const Medicines = require('../models/medicines')



exports.addMedicines = async (req, res) => {
    const { medicineName, medicinePrice, medicineQuantity } = req.body;
    const isNewMedicine = await Medicines.isThisMedicineAlreadyAdded(medicineName);
    
    if (!isNewMedicine)
      return res.json({
        success: false,
        message: 'This medicine is already in already added, try sign-in',
      });
    const medicine = await Medicines({
      medicineName, medicinePrice, medicineQuantity
    });
    await medicine.save();
    res.json({ success: true, medicine });
  }

  exports.getAllMedicines = async (req, res) => {
    const query = { $text: { $search:  "\"${req.query.keyword}\"" } };
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: 'Authorization fail!' });
      }
      const keyword = req.query.keyword
      console.log("keyword.trim().length ",keyword, keyword.trim().length)
      let medicines 
      if(!keyword.trim().length){
        medicines = await Medicines.find()
      }
      else{
        medicines = await Medicines.find(
          {medicineName: {$regex: keyword, $options: 'i' }}
      )
      }
     

      if(medicines){
        return res.status(200).json({success: true, medicines})
      }
      return res.status(200).json({success: true, medicines: []})
  
     
    }
  };
