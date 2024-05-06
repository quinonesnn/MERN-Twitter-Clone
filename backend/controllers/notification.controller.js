import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try{
        const userId = req.user._id;

        const notifications = await Notification.find({to: userId})
            .populate({
                path: "from",
                select: "username profileImg"
            });

        await Notification.updateMany({to: userId}, {read: true});

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller", error.message);
        res.status(400).json({error: error.message});
    }
}

export const deleteAllNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({to: userId});
        res.status(200).json({message: "Notifications deleted successfully"});
    } catch (error) {
        console.log("Error in deleteNotifications controller", error.message);
        res.status(400).json({error: error.message});
    }
}

export const deleteNotification = async (req, res) => {
    try{
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = new Notification.findById(notificationId);

        if(!notification){
            return res.status(404).json({error: "Notification not found"});
        }  
        if(notification.to.toString() !== userId.toString()){
            return res.status(401).json({error: "Unauthorized"});
        }
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({message: "Notification deleted successfully"});
    } catch (error) {
        console.log("Error in deleteNotification controller", error.message);
        res.status(400).json({error: error.message});
    }
}