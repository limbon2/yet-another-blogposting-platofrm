import React, { FC, useEffect } from 'react';
import { PostsApi } from '@blogposting-platform/api';

const posts = new PostsApi({ isJsonMime: (mime) => true, basePath: 'http://localhost:3000' });

const App: FC = () => {
  useEffect(() => {
    posts.postsControllerGet().then((posts) => {
      console.log(posts);
    });
  }, []);

  return <div>app</div>;
};

export default App;
