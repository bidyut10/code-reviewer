const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			default: "", 
		},
		profileUrl: {
			type: String,
			required: true,
		},
		accessToken: {
			type: String,
			default: "", 

		}, 
		refreshToken: {
			type: String,
			default: "",
		},
		avatarUrl: {
			type: String,
		},
		reviews: [
			{
				repoName: {
					type: String,
				},
				reviewDate: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
