import React, { useState, useEffect } from 'react';
import * as S from './style';  // Assuming you already have the styling here
import { IoIosWarning } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    actionType: 'del' | 'apr';  // This determines the action type
    actionFunction: (userId: number) => Promise<void>;  // Del or Apr function
}

const TeacherModal: React.FC<ModalProps> = ({ isOpen, onClose, userId, actionType, actionFunction }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleAction = async () => {
        if (userId === null) return;
        try {
            await actionFunction(userId);
            onClose();  // Close modal after action
        } catch (error) {
            console.error('Action failed', error);
        }
    };

    if (!isVisible) return null;

    return (
        <S.ModalBackground onClick={onClose}>
            <S.ModalWrapper $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <S.WarningTextWrap>
                    <IoIosWarning className='warning_logo' />
                    <h1>{actionType === 'del' ? "이 실습실 신청을 삭제하시겠습니까?" : "이 실습실 신청을 승인하시겠습니까?"}</h1>
                </S.WarningTextWrap>
                <p>{actionType === 'del'
                    ? "실습실 신청을 삭제하면, 이 신청은 완전히 사라집니다."
                    : "실습실 신청을 승인하면, 학생들에게 표시됩니다."}
                </p>

                <S.BtnWrap>
                    <button onClick={handleAction} className='confirm_btn'>{actionType === 'del' ? '취소' : '승인'}</button>
                    <button onClick={onClose} className='cancel_btn'>닫기</button>
                </S.BtnWrap>
            </S.ModalWrapper>
        </S.ModalBackground>
    );
};

export default TeacherModal;
