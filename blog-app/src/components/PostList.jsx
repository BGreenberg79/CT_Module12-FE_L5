import React, { useMemo, useCallback } from 'react'
import { Container, ListGroup, Spinner, Alert, Button, Form } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import fetchPostList from '../api/fetchPostList'
import PostItem from './PostItem'
import CommentForm from './CommentForm'
import { useTranslation } from 'react-i18next'

const PostList = () => {

    const { t, i18n } =useTranslation();
    const changeLanguage = (lng) =>{
        i18n.changeLanguage(lng);
     }

    const [show, setShow] = useState(true)
    const [userId, setUserId] = useState('')

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPostList
    })

    // Memoizes post list so it only changes when posts change or userId changes
    const filteredPosts = useMemo(()=> {
        if (!userId) {return data};
        return data.filter(post => post.userId === parseInt(userId));
    }, [data, userId])

    // Memoizes the function that allows for filtration and selection of posts by UserId within the form that we are rendering
    const handleUserIdFilter = useCallback((e) => {
        setUserId(e.target.value);
    }, [])



    if (isLoading) {
        return (
            <Spinner animation="border" role="status" variant="warning" aria-live='polite'> {/*Polite aria-live role as isLoading is not time sensitive for the screen reader */}
                <span>{t('loading')}</span></Spinner>
        )
    }
    if (isError) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible role='alert' aria-live ="assertive"> {/*Assertive live aria role to interrupt screen reader with time sensitive errors  */}
                <Alert.Heading>{t('error.heading')}</Alert.Heading>
                <p>
                    {error.message}
                </p>
            </Alert>
        );
    }

    return (
        <Container>
            <div>
            <Button variant='warning' onClick={()=> changeLanguage('en')}>English</Button>
            <Button variant='warning' onClick={()=> changeLanguage('zh')}>普通话 中文</Button>
            </div>
            {filteredPosts ? <h2>{t('postList.header')}</h2>: <h2>{t('postList.filteredHeader', { userId: post.userId})}</h2>}
            <Form aria-labelledby={t('postList.filterForm.formRecordLabel')}>
                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label id='userIdFiltering'>{t('postList.filterForm.label')}</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder={t('postList.filterForm.placeholder')}
                        onChange={handleUserIdFilter}
                        value={userId}
                        aria-label={t('postList.filterForm.recordLabel')}
                    />
                </Form.Group>
            </Form>
            <CommentForm/>
            <ListGroup role='list' aria-live='polite'> {/* ListGroup bootstrap class has aria role of list as the posts will be listed here. Our PostItem component and ternary operator errors will have listitem roles correspondingly */}
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostItem key={post.id} post={post} />
                        // Pass the posts, from the filteredPosts constant (or if there is no userId straight from data), as a prop into the PostItem component (that uses React.memo) which I then render in this return statement
                        // When the props that I am passing in don't change, this map will not re-render 
                    ))
                ) : (
                        <ListGroup.Item className='text-danger' role='listitem' aria-live='assertive'> {/* Aria live attribute is assertive as here is another error message when no posts are found with that user ID */}
                            {t('error.noPost')}
                        </ListGroup.Item>
                    )}
            </ListGroup>
        </Container>
    )
}

export default PostList;