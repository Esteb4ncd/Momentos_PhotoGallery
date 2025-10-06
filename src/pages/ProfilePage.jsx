
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ProfilePage = () => {
    const user = {
        username: "USERNAME",
        bio: "Short bio about the user goes here.",
        joined: "Sept 2025",
        photos: 12,
        likes: 58,
        images: Array.from({ length: 6 }, (_, i) => ({
        id: i,
        url: `https://picsum.photos/400/300?random=${i + 1}`,
        })),
    };

    return (
        <section className="profile-page">
        <div className="profile-avatar"></div>


        <h2 className="profile-username">{user.username}</h2>

        <div className="profile-bio">{user.bio}</div>

        <div className="profile-info">
            Joined {user.joined} | {user.photos} Photos | {user.likes} Likes
        </div>

        <div className="profile-gallery">
            {user.images.map((img) => (
            <div key={img.id} className="photo-card">
                <img src={img.url} alt={`User photo ${img.id}`} />
            </div>
            ))}
        </div>
        </section>
    );
};

export default ProfilePage;



