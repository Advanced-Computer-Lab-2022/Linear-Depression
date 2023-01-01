const BrowserUrlRegex = new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtube\.com\/watch\?v=/);
const ShareUrlRegex = new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu\.be\//);

const enum VideoURLType {
    BROWSER = 1,
    SHARE = 2
}

const isValidVideoLink = (videoLink: string) => {
    return BrowserUrlRegex.test(videoLink) || ShareUrlRegex.test(videoLink);
};

const getVideoURLType = (videoLink: string) => {
    if (BrowserUrlRegex.test(videoLink)) {
        return VideoURLType.BROWSER;
    } else if (ShareUrlRegex.test(videoLink)) {
        return VideoURLType.SHARE;
    } else {
        throw new Error("Invalid video link");
    }
};

const getVideoId = (videoLink: string) => {
    if (!isValidVideoLink(videoLink)) {
        throw new Error("Invalid video link");
    }

    const videoURLType = getVideoURLType(videoLink);

    let videoId = "";
    if (videoURLType === VideoURLType.BROWSER) {
        videoId = videoLink.split("v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
    } else if (videoURLType === VideoURLType.SHARE) {
        videoId = videoLink.split(".be/")[1];
    }
    return videoId;
};

const getVideoEmbedUrl = (videoLink: string) => {
    const videoId = getVideoId(videoLink);
    return `https://www.youtube.com/embed/${videoId}`;
};

const getVideoThumbnailUrl = (videoLink: string) => {
    try {
        const videoId = getVideoId(videoLink);
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    } catch {
        return "https://www.messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg";
    }
};

export { isValidVideoLink, getVideoThumbnailUrl, getVideoEmbedUrl };
