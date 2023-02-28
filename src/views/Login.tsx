import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

import {publicRequest} from "@/lib/axios";
import {updateLocalStorage} from "@/lib/utils";
interface IFormInputs {
    name: string;
}
export default function Login() {
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        formState: {errors, isValid, isDirty, isSubmitting}
    } = useForm<IFormInputs>({mode: "onChange"});
    const onSubmit = async (data: any) => {

        const response = await publicRequest.post('/auth',{
            name: data.name
        })

        updateLocalStorage('state', 'user_id', response.data.id)

        navigate("/")
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'xl'} w={"md"} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'}>This is the tale of...</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('#A5271C', '#2B2D2F')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl id="name" isInvalid={!isValid && isDirty}>
                                <FormLabel htmlFor='name' color={useColorModeValue("#D3BBAF", "#fff")}>Name</FormLabel>
                                <Input
                                    data-test="new-user-field"
                                    id='name'
                                    autoComplete={"off"}
                                    placeholder='...'
                                    {...register('name', {
                                        required: 'This is required',
                                        minLength: {value: 4, message: 'Minimum length should be 4'},
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>

                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    data-test="new-user-button"
                                    isLoading={isSubmitting}
                                    type="submit"
                                    _hover={{bg: useColorModeValue("#d8cfc5", "#000")}}
                                    color={useColorModeValue("#444", "#fff")}
                                    bg={useColorModeValue("#f0e7db", "#191919")}>
                                    Play
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}