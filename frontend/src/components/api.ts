import { FileWithPath } from '@mantine/dropzone';
import { Dispatch, SetStateAction } from 'react';

interface ApiData {
  key: number;
  mode: string;
  method: string;
  message: string | null;
}

export async function encryptApiData(data: ApiData, image: FileWithPath[], setFail: Dispatch<SetStateAction<boolean>>) {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const base64Image = e.target?.result;

    try {
      const response = await fetch('http://127.0.0.1:8000/encrypt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          base64Image,
        }),
      });
      const json = await response.json();
    } catch (error) {
      setFail(true);
      console.log(error);
    }
  };

  await reader.readAsDataURL(image[0]);
}

export async function signup(username: string, password: string, confirmPassword : String, setFail: any) {
  try {
    const response = await fetch('http://127.0.0.1:8000/encrypt/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await response.json();
  } catch (error) {
    setFail(true);
    console.log(error);
  }
}

export async function login(username: string, password: string,  setFail: any) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await response.json();
    console.log(json)
  } catch (error) {
    setFail(true);
    console.log(error);
  }
}
  
