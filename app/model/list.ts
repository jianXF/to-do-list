import {Application} from 'egg';

module.exports = (app: Application) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ListSchema = new Schema({
        uuid: {
            type: String,
            unique: true,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        create_time: {
            type: String,
            required: true
        },
        update_time: String,
        is_completed: {
            type: String,
            default: '0'
        },
        is_deleted: {
            type: String,
            default: '0'
        }


    });
    return mongoose.model('List', ListSchema);
};
