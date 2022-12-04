const isValidVideoLink = (videoLink: string) => {
    const regex = new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtube\.com\/watch\?v=/);
    return regex.test(videoLink);
};

const getVideoId = (videoLink: string) => {
    if (!isValidVideoLink(videoLink)) {
        throw new Error("Invalid video link");
    }
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
