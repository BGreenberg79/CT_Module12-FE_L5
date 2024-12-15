import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

const PostItem = React.memo(({ post }) => {
    const { t } =useTranslation();

    return (
                <ListGroup.Item variant='info' role='listitem' aria-live='polite' aria-labelledby={t('postItem.recordLabel', { postId: post.id})}>
                    {t('postItem.postId')} {post.id}<br />
                    {t('postItem.userId')} {post.userId}<br />
                    {t('postItem.title')} {post.title}<br />
                    {t('postItem.body')} {post.body}
                </ListGroup.Item>
// Added aria-labelledby to List Group Item to declare purpose to screen reader that the following details are related to this specific post id number
    );
});

export default PostItem;