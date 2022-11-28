const getVideoId = (videoLink: string) => {
    let videoId = videoLink.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId;
};

const getVideoThumbnailUrl = (videoLink: string) => {
    const videoId = getVideoId(videoLink);
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};

export { getVideoThumbnailUrl, getVideoId };
