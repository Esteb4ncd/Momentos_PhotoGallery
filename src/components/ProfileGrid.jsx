import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const PhotoGrid = ({ photos, cols = 3, variant = "woven", gap = 8 }) => {
    return (
        <ImageList
        sx={{
            width: "100%",
            height: "auto",
            maxWidth: 800,
            margin: "0 auto",
        }}
        variant={variant}
        cols={cols}
        gap={gap}
        >
        {photos.map((photo) => (
            <ImageListItem key={photo.img}>
            <img
                src={`${photo.img}?w=161&fit=crop&auto=format`}
                srcSet={`${photo.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={photo.title}
                loading="lazy"
            />
            </ImageListItem>
        ))}
        </ImageList>
    );
    };

export default PhotoGrid;
