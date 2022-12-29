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
import { useCurrentAdmin, useNotice } from "adminjs";
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

const UserReplyContainer = styled(Section)`
    margin-bottom: 16px;
    border-radius: 8px;
`;

const AdminReplyContainer = styled(Section)`
    margin-bottom: 16px;
    border-radius: 8px;
    background-color: #e9ecef;
`;

const ShowPage = () => {
    const [thread, setThread] = useState<any>(null);
    const { recordId: threadId } = useParams();
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);

    const [currentAdmin] = useCurrentAdmin();
    const sendNotice = useNotice();

    const [replyAdded, setReplyAdded] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/report-thread/${threadId}`)
            .then((res) => {
                console.log("res", res.data);
                setThread(res.data.thread);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, [replyAdded]);

    const addReply = (message: string) => {
        axios
            .post(`${API_URL}/report-thread/${threadId}`, {
                message,
                userId: currentAdmin?._id
            })
            .then((res) => {
                sendNotice({
                    message: "Reply added successfully!",
                    type: "success"
                });

                setReplyAdded(true);
            })
            .catch((err) => {
                sendNotice({
                    message: "Error adding reply. Please try again later.",
                    type: "error"
                });
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
                    if (!replyTextArea.value) return alert("Please enter a message");

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
                <H4>Thread</H4>
                <Button onClick={() => setIsReplyModalVisible(true)}>
                    <Icon icon="Send" />
                    Add Reply to Thread
                </Button>
            </RepliesHeaderContainer>

            <UserReplyContainer>
                <ReplyAuthorContainer>
                    <H5>
                        <ResourceLink
                            to={`/admin/resources/${thread?.reportId.userId.__t}/records/${thread?.reportId.userId._id}/show`}
                        >
                            {thread?.reportId.userId.firstName} {thread?.reportId.userId.lastName}
                        </ResourceLink>
                    </H5>
                    <Caption>Posted at: {moment(thread?.reportId.createdAt).format("DD/MM/YYYY HH:mm")}</Caption>
                </ReplyAuthorContainer>

                <Text variant="lg">{thread?.reportId.description}</Text>
            </UserReplyContainer>

            {thread?.replies.map((reply: any) =>
                reply.userId.__t === "Admin" ? (
                    <AdminReplyContainer key={reply._id}>
                        <ReplyAuthorContainer>
                            <H5>
                                <ResourceLink
                                    to={`/admin/resources/${reply.userId.__t}/records/${reply.userId._id}/show`}
                                >
                                    {reply.userId.firstName} {reply.userId.lastName}
                                </ResourceLink>
                            </H5>
                            <Caption>Posted at: {moment(reply.createdAt).format("DD/MM/YYYY HH:mm")}</Caption>
                        </ReplyAuthorContainer>

                        <Text variant="lg">{reply.message}</Text>
                    </AdminReplyContainer>
                ) : (
                    <UserReplyContainer key={reply._id}>
                        <ReplyAuthorContainer>
                            <H5>
                                <ResourceLink
                                    to={`/admin/resources/${reply.userId.__t}/records/${reply.userId._id}/show`}
                                >
                                    {reply.userId.firstName} {reply.userId.lastName}
                                </ResourceLink>
                            </H5>
                            <Caption>Posted at: {moment(reply.createdAt).format("DD/MM/YYYY HH:mm")}</Caption>
                        </ReplyAuthorContainer>

                        <Text variant="lg">{reply.message}</Text>
                    </UserReplyContainer>
                )
            )}

            {isReplyModalVisible && (
                <Modal {...modalProps}>
                    <TextArea width="100%" id="reply-text-area" />
                </Modal>
            )}
        </Box>
    );
};

export default ShowPage;
