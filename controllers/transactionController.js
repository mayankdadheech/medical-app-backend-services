const Transactions = require('../models/transactions')


exports.proceedPayment = async (req, res) => {
    const { medicinesDetails, totalAmount, userEmail } = req.body;
    console.log("req.body ", req.body)
    if( !medicinesDetails || !totalAmount || !userEmail  ){
        return res
        .status(500)
        .json({ success: false, message: 'medicinesDetails, totalAmount, userEmail, userId  cannot be empty.' });
    }
    const transaction = await Transactions({
        medicinesDetails, totalAmount, userEmail
    });
    await transaction.save();
    res.json({ success: true, message: "Payment Completed Successfully. you order will be dispatched soon." });
  }


  exports.getActiveTransactions = async (req, res) => {
    const { userEmail } = req.body;
    console.log("req.body ", req.body)
    if( !userEmail  ){
        return res
        .status(500)
        .json({ success: false, message: 'userEmail cannot be empty.' });
    }
    const transaction = await Transactions.find({ userEmail, isActive: true });
    // const transaction = await Transactions({
    //     medicinesDetails, totalAmount, userEmail
    // });
    console.log("transaction ", transaction)
    res.json({ success: true, transaction });
  }


  exports.getLastThreeTransactionDetails = async (req, res) => {
    const { userEmail, transactionLimit } = req.body;
    console.log("req.body ", req.body)
    if( !userEmail  ){
        return res
        .status(500)
        .json({ success: false, message: 'userEmail, transactionLimit cannot be empty.' });
    }
    const transaction = await Transactions.aggregate([ {$match:{ userEmail: userEmail}}, {$sort: {timestamp: -1}}, { $limit : Number(transactionLimit) } ]);

    console.log("transaction ", transaction)
    res.json({ success: true, transaction });
  }