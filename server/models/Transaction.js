import mongoose from 'mongoose'

const transactionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:true

    },
    title:{
        type:String,
        required:[true,'Please enter a tile name']

    },
    amount:{
        type:Number,
        required:[true,'Please enter a valid amount'],
        min:[0,'Amount cannot be negative']
    },
    category:{
        type:String,
        required:[true,'Please select a Category']
    },
    paymentMethod:{
        type:String,
        enum:['cash','card','upi','bank transfer','wallet','other'],
        default:'card'
    },
    descrption:{
      type:String,
      trim:true
    },
    transactionDate:{
        type:Date,
        default:Date.now,
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }

    
    
});
transactionSchema.index({userId: 1,transactionDate:-1});
transactionSchema.index({userId: 1,type:1});
transactionSchema.index({userId: 1,category:1});

export default mongoose.model('Transaction', transactionSchema);