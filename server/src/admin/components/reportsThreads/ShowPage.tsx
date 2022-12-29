import React from "react";
import {
    H1,
    H4,
    H5,
    Caption,
    Box,
    Section,
    Modal,
    VariantType,
    Button,
    Text,
    Icon,
    TextArea
} from "@adminjs/design-system";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import { API_URL } from "../../config";

const ResourceLink = styled(Link)`
    color: #000;
    text-decoration: none;
    &:hover {
        color: #007bff;
    }
`;

const RepliesHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ReplyAuthorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ReplyContainer = styled(Section)`
    margin-bottom: 16px;
    border-radius: 8px;
`;

const ShowPage = () => {
    const [thread, setThread] = useState<any>(null);
    const { recordId: threadId } = useParams();
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/report-thread/${threadId}`)
            .then((res) => {
                setThread(res.data.thread);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    const addReply = (message: string) => {
        axios
            .post(`${API_URL}/report-thread/${threadId}`, {
                message
            })
            .then((res) => {
                setThread(res.data.thread);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const modalProps = {
        label: "Add Reply",
        icon: "Send",
        title: "Message",
        variant: "primary" as VariantType,
        onOverlayClick: () => setIsReplyModalVisible(false),
        onClose: () => setIsReplyModalVisible(false),
        buttons: [
            {
                label: "Cancel",
                onClick: () => setIsReplyModalVisible(false)
            },
            {
                label: "Reply",
                onClick: () => {
                    const replyTextArea = document.getElementById("reply-text-area") as HTMLTextAreaElement;
                    addReply(replyTextArea.value);
                    setIsReplyModalVisible(false);
                },
                variant: "primary" as VariantType
            }
        ]
    };

    return (
        <Box variant="white">
            <H1>
                <ResourceLink to={`/admin/resources/Report/records/${thread?.reportId._id}/show`}>
                    {thread?.reportId.subject}
                </ResourceLink>
            </H1>

            <RepliesHeaderContainer>
                <H4>Replies</H4>
                <Button onClick={() => setIsReplyModalVisible(true)}>
                    <Icon icon="Send" />
                    Add Reply
                </Button>
            </RepliesHeaderContainer>

            {thread?.replies.map((reply: any) => (
                <ReplyContainer key={reply._id}>
                    <ReplyAuthorContainer>
                        <H5>
                            <ResourceLink to={`/admin/resources/${reply.userId.__t}/records/${reply.userId._id}/show`}>
                                {reply.userId.firstName} {reply.userId.lastName}
                            </ResourceLink>
                        </H5>
                        <Caption>Posted at: {moment(reply.createdAt).format("DD/MM/YYYY HH:mm")}</Caption>
                    </ReplyAuthorContainer>

                    <Text variant="lg">{reply.message}</Text>
                </ReplyContainer>
            ))}

            {isReplyModalVisible && (
                <Modal {...modalProps}>
                    <TextArea width="100%" id="reply-text-area" />
                </Modal>
            )}
        </Box>
    );
};

export default ShowPage;
