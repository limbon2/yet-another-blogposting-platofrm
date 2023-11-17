/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { RichTextInput } from 'ra-input-rich-text';
import {
  Admin,
  ArrayField,
  ArrayInput,
  AuthProvider,
  BooleanField,
  ChipField,
  Create,
  CreateParams,
  CreateResult,
  DataProvider,
  Datagrid,
  DateField,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  List,
  NumberField,
  RaRecord,
  Resource,
  SimpleForm,
  SimpleFormIterator,
  SingleFieldList,
  TextField,
  TextInput,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
  required,
  minLength,
  maxLength,
  Show,
  RichTextField,
  ShowButton,
  FunctionField,
} from 'react-admin';
import { AuthApi, CreatePostDataDto, PostsApi } from '@blogposting-platform/api';

const apis = {
  posts: new PostsApi({
    isJsonMime: () => true,
    basePath: process.env.NX_BACKEND_URL,
    accessToken: localStorage.getItem('accessToken') ?? '',
  }),
};

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    switch (resource) {
      case 'posts': {
        const response = await apis.posts.postsControllerGet(0, 10);
        const result: GetListResult<any> = {
          data: response.data,
          total: response.data.length,
        };
        return result;
      }

      default:
        throw new Error('Unknown resource ' + resource);
    }
  },
  getOne: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetOneParams<RecordType>
  ): Promise<GetOneResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  getMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  getManyReference: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  update: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateParams<any>
  ): Promise<UpdateResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  updateMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateManyParams<any>
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  create: async (resource: string, params: CreateParams<any>): Promise<CreateResult<any>> => {
    switch (resource) {
      case 'posts': {
        const { data } = params;
        const tags = data.tags.map((tag: { name: string }) => tag.name);

        const response = await apis.posts.postsControllerCreate({
          ...data,
          tags,
          communityId: null,
        } as CreatePostDataDto);
        const result: CreateResult<any> = {
          data: response.data,
        };
        return result;
      }

      default:
        throw new Error('Unknown resource ' + resource);
    }
  },
  delete: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  deleteMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
};

const authApi = new AuthApi({ isJsonMime: () => true, basePath: process.env.NX_BACKEND_URL });

const authProvider: AuthProvider = {
  login: async ({ username, password }): Promise<any> => {
    try {
      const response = await authApi.authControllerSignIn({ email: username, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  },
  logout: async (params: any): Promise<string | false | void> => {
    localStorage.removeItem('accessToken');
  },
  checkAuth: async (params: any): Promise<void> => {
    if (!localStorage.getItem('accessToken')) return Promise.reject();
    return Promise.resolve();
  },
  checkError: async (error: any): Promise<void> => {},
  getPermissions: async (params: any): Promise<any> => {},
};

const PostList = () => {
  return (
    <List title="Posts">
      <Datagrid>
        <TextField source="title" />
        <BooleanField source="isBanned" />
        <NumberField source="rating" />
        <TextField label="Community" source="community.name" />
        <TextField label="Author" source="author.username" />
        <ArrayField label="Tags" source="tags">
          <SingleFieldList linkType={false}>
            <ChipField source="name" />
          </SingleFieldList>
        </ArrayField>
        <DateField source="createdAt" />
        <FunctionField render={(record: any) => <ShowButton record={record} />} />
      </Datagrid>
    </List>
  );
};

const CreatePost = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <RichTextInput source="content" />
        <ArrayInput
          source="tags"
          validate={[minLength(2), maxLength(16)]}
          children={
            <SimpleFormIterator inline>
              <TextInput source="name" helperText={false} />
            </SimpleFormIterator>
          }
        />
      </SimpleForm>
    </Create>
  );
};

const ShowPost = () => {
  return (
    <Show>
      <RichTextField source="content" />
    </Show>
  );
};

const App: FC = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      <Resource name="posts" show={ShowPost} hasCreate create={CreatePost} list={PostList} />
    </Admin>
  );
};

export default App;
