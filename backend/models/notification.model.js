import mongoose from 'mongoose';
const { Schema } = mongoose

const notificationSchema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["like", "follow"],
        // enum: ["like", "comment", "follow", "reply", "message"],
    },
    read: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

