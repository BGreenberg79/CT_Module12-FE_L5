import { useState } from "react";
import {Container, Form, ListGroup, Button} from'react-bootstrap';
import { useTranslation } from "react-i18next";

const CommentForm = ()=>{

    const { t } =useTranslation();


    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] =useState({
        commenterName: '', 
        commentBody: '', 
        postId: 0})

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        setCommentList((prevCommentList) => [...prevCommentList,
            {...newComment, commentId:prevCommentList.length + 1}]);

        setNewComment({
            commenterName: '', 
            commentBody: '', 
            postId: 0
        })
    };

return(
    <Container>
        <Form aria-labelledby={t('commentForm.formRecordLabel')} onSubmit={handleSubmit}>                
                <Form.Group className="mb-3" controlId="commenterName">
                    <Form.Label id='commenterName'>{t('commentForm.commenterName.label')}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t('commentForm.commenterName.placeholder')}
                        onChange={(event) =>setNewComment((prevState) => ({...prevState, commenterName: event.target.value}))}
                        value={newComment.commenterName}
                        aria-label={t('commentForm.commenterName.recordLabel')}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="commentBody">
                    <Form.Label id='commentBody'>{t('commentForm.commentBody.label')}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t('commentForm.commentBody.placeholder')}
                        onChange={(event)=> setNewComment((prevState) =>({...prevState, commentBody: event.target.value}))}
                        value={newComment.commentBody}
                        aria-label={t('commentForm.commentBody.recordLabel')}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="postId">
                    <Form.Label id='postId'>{t('commentForm.postId.label')}</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder={t('commentForm.postId.placeholder')}
                        onChange={(event)=> setNewComment((prevState) => ({...prevState, postId: event.target.value}))}
                        value={newComment.postId}
                        aria-label={t('commentForm.postId.recordLabel')}
                    />
                </Form.Group>
                <Button type="Submit">{t('commentForm.submitButton')}</Button>
        </Form>
        <ListGroup role='list' aria-live='polite'>
                {commentList.map((comment) => (
                    <ListGroup.Item key={comment.commentId} variant='dark' role='listitem' aria-live='polite' aria-labelledby={`Comment for Post Id: ${comment.postId}`} className='text-white'>
                    {t('commentList.commenterName')}{comment.commenterName}< br/>
                    {t('commentList.postId')} {comment.postId}<br/>
                    {t('commentList.commentBody')} {comment.commentBody}
                    </ListGroup.Item>
                    ))}      
        </ListGroup>    
    </Container>
)}
export default CommentForm