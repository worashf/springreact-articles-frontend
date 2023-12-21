import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  List,
  ListItem,
} from '@mui/material';
import Header from '../components/layouts/Header';
import { useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axiosInstance.get(`/articles/${id}`);
        if (data) {
          setArticle(data);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <Box m="20px">
      <Header title="Article Detail" subTitle="Viewing article details" />
      <Box m="40px 0 0 0">
        <Grid container spacing={2}>
          {article && (
            <>
              <Grid item xs={12} md={12} lg={12}>
                <Card>
                  <Typography variant="h4">{article.title}</Typography>
                  <Typography>{article.body}</Typography>
                  <Typography>{article.createdAt}</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Card>
                  <h2>Author Information</h2>
                  <List>
                    <ListItem>Name: {article.authorName}</ListItem>
                    <ListItem>Email: {article.authorEmail}</ListItem>
                  </List>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ArticleDetail;
