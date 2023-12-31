import {
    Text,
    Box,
    Container,
    TextInput,
    PasswordInput,
    Space,
    Button,
    Center,
    Flex,
    Notification,
    useMantineColorScheme,
    Checkbox
  } from '@mantine/core';
  import { useState } from 'react';
  import { signup } from './api';
  import { useForm, isEmail, hasLength, matchesField } from '@mantine/form';
  import { IconX } from '@tabler/icons-react';
  
  export function SignUP() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [failed, setFail] = useState([false, '']);
    const form = useForm({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
  
      validate: {
        password: hasLength(
          { min: 6, max: 64 },
          'Name must be 6-64 characters long'
        ),
        email: isEmail('Invalid email'),
        confirmPassword: matchesField('password', 'Passwords are not the same'),
      },
    });
  
    return (
      <>
        <Container size="xs" px="xs">
          <Box
          style={{
            backgroundColor: colorScheme === 'dark' ? 'dark.6' : 'gray.2',
            borderRadius: '10px',
          }}
          p="md"
            component="form"
            onSubmit={form.onSubmit((values) => {
                signup(
                values['email'],
                values['password'],
                values['confirmPassword'],
                setFail
              );
            })}
          >
            <TextInput
              placeholder="Your Email-adress"
              label="Email Adress"
              withAsterisk
              {...form.getInputProps('email')}
            />
            <Space h="md" />
            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              {...form.getInputProps('password')}
              withAsterisk
            />
            <Space h="md" />
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              description="Password must include at least one letter, number and special character"
              {...form.getInputProps('confirmPassword')}
              withAsterisk
            />
            <Space h="md" />
            <Space h="lg" />
                <Checkbox label="I agree to sell my privacy" />
            <Center>
              <Button type="submit">Sign up</Button>
            </Center>
            <Space h="md" />
            <Text
              display="block"
              ta="center"
              td="underline"
              component="a"
              href="./login"
              bg={colorScheme === 'dark' ? 'dark.6' : 'gray.2'}
              c={colorScheme === 'dark' ? 'white' : 'gray.6'}
              p="md"
              style={{
                borderRadius: '10px',
                cursor: 'pointer',
  
                '&:hover': {
                  backgroundColor: colorScheme === 'dark' ? 'dark.5' : 'gray.1',
                },
                }}
              
            >
              Already have an account? then sign in
            </Text>
          </Box>
        </Container>
        <Flex
        style={{
            position: 'absolute',
            bottom: 50,
            right: 50,
          }}
          direction="column"
          gap={10}
        >
          <Notification
            icon={<IconX size="1.5rem" />}
            color="red"
            title="Login failed"
            style={{
                width: 400,
                height: 75,
                display: failed[0] ? 'flex' : 'none',
              }}
            onClose={() => {
              setFail([false, '']);
            }}
          >
            {failed[1]}
          </Notification>
        </Flex>
      </>
    );
  }