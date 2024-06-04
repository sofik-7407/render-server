const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema({
  permission: {
    type: Boolean,
    default: true
  }
});

// Adding the auto-increment plugin to the schema
const permission = mongoose.model('render-permission',permissionSchema);

module.exports = permission;
