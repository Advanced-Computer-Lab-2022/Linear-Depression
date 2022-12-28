interface RefundRequest {
    _id: string;
    enrollmentId: string;
    traineeId: string;
    status: string;
    refundAmount: number;
}

export default RefundRequest;
