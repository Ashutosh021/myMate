const userSchema = require("../Models/user");

const Profile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  res.send(req.user);
};

const UpdateProfile = async (req, res) => {
  const { name, email, bio } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      message: "User not found. Please log in again.",
    });
  }

  try {
    const updated = await userSchema.findOneAndUpdate(
      { _id: userId },
      { name, email, bio },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "User not found or update failed." });
    }

    res.json({ user: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Could not update profile.", error });
  }
};

const GetUser = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID not provided." });
  }

  try {
    const user = await userSchema.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve user.", error });
  }
};

const Follow = async (req, res) => {
    const user = req.user;
    const followUserId = req.params.userId;

    if (!followUserId) {
        return res.status(400).json({ message: "User ID to follow not provided." });
    }

    try {
        const targetUser = await userSchema.findById(followUserId);

        if (!targetUser) {
            return res.status(404).json({ message: "User to follow not found." });
        }

        // Add followUserId to user's following list and user._id to targetUser's followers list
        if (!user.following.includes(followUserId)) {
            user.following.push(followUserId);
        }

        if (!targetUser.followers.includes(user._id)) {
            targetUser.followers.push(user._id);
        }

        // Save changes to the database
        await user.save();
        await targetUser.save();

        res.json({
            message: "User followed successfully.",
            following: user.following,
            followers: targetUser.followers
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not follow user.", error });
    }
};


const Unfollow = async (req, res) => {
    const user = req.user;
    const unfollowUserId = req.params.userId;

    if (!unfollowUserId) {
        return res.status(400).json({ message: "User ID to unfollow not provided." });
    }

    try {
        const targetUser = await userSchema.findById(unfollowUserId);

        if (!targetUser) {
            return res.status(404).json({ message: "User to unfollow not found." });
        }

        // Remove unfollowUserId from user's following list and user._id from targetUser's followers list
        user.following = user.following.filter(id => id.toString() !== unfollowUserId);
        targetUser.followers = targetUser.followers.filter(id => id.toString() !== user._id.toString());

        // Save changes to the database
        await user.save();
        await targetUser.save();

        res.json({
            message: "User unfollowed successfully.",
            following: user.following,
            followers: targetUser.followers
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not unfollow user.", error });
    }
};


module.exports = {
  Profile,
  UpdateProfile,
  GetUser,
  Follow,
  Unfollow,
};
