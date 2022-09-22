const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    let temp = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/workOrders?retryWrites=true&w=majority';
    // temp = process.env.DB_STRING;
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
