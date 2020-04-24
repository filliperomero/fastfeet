import React, { useState, useRef, useEffect } from 'react';
import { MdInsertPhoto } from 'react-icons/md';
import { useField } from '@unform/core';
import api from '~/services/api';

import { Container, AvatarPlaceholder } from './styles';

export default function AvatarInput() {
  const avatarRef = useRef();
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (avatarRef.current) {
      registerField({
        name: 'avatar_id',
        ref: avatarRef.current,
        path: 'dataset.file',
        setValue(ref, value) {
          if (value) {
            setPreview(value.url);
            setFile(value.id);
          }
        },
        clearValue(ref, _) {
          ref.value = '';
          setPreview(null);
        },
      });
    }
  }, [avatarRef]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Avatar" />
        ) : (
          <AvatarPlaceholder>
            <MdInsertPhoto size={56} color="#ddd" />
            <span>Adicionar foto</span>
          </AvatarPlaceholder>
        )}

        <input
          id="avatar"
          type="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={avatarRef}
        />
      </label>
    </Container>
  );
}
