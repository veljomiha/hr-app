import {
  Flex,
  Input,
  Button,
  FormControl,
  Box,
  chakra,
  Text,
  InputLeftElement,
  InputGroup,
  Checkbox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { HiOutlineMail, HiOutlineOfficeBuilding } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useAuthContext } from "./UserContext";
import { useEffect, useRef, useState } from "react";
import { Select } from "@chakra-ui/react";
import { getCompanyAll } from "../services/company";
const CFiUser = chakra(FiUser);
const CHiOutlineMail = chakra(HiOutlineMail);
const CFiLock = chakra(FiLock);

const Register = () => {
  // const [companies, setCompanies] = useState([]);

  // useEffect(() => {
  //   getCompanyAll().then((response) => {
  //     setCompanies(response.data.data);
  //   });
  // }, []);

  const { register, handleSubmit, watch } = useForm();
  const { registerFunction } = useAuthContext();
  const filePicker = useRef(null);
  const [files, setFile] = useState(null);
  const [error, setRegistrationError] = useState(null);
  const [duplicateEmail, setDuplicateEmail] = useState(null);

  // const company_is_new = watch("company_is_new");

  const onSubmit = async (user) => {
    try {
      if (!user.name || !user.email || !user.password || files === null) {
        setRegistrationError("You did not enter all the correct data");
        return;
      } else {
        setRegistrationError(null);
      }
      if (user.password.length < 6) {
        setRegistrationError("Password must have at least 6 characters");
        return;
      } else {
        setRegistrationError(null);
      }
      const formData = new FormData();
      formData.append("files", files[0]);

      await registerFunction(user, formData);
    } catch (error) {
      setDuplicateEmail(error);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box
        w={{ base: "300px", sm: "400px" }}
        color="teal.400"
        textAlign="center"
      >
        <Text fontSize="24px" fontWeight="bold">
          uTeam - Register
        </Text>
        <Box
          bg="white"
          mt="20px"
          p="30px"
          borderRadius="5px"
          fontSize="16px"
          boxShadow="xl"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Name
              </Text>
              <InputGroup color="black">
                <InputLeftElement children={<CFiUser color="gray.300" />} />
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  _focus={{ border: "1px solid #007C8C" }}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Email
              </Text>
              <InputGroup color="black">
                <InputLeftElement
                  children={<CHiOutlineMail color="gray.300" />}
                />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  _focus={{ border: "1px solid #007C8C" }}
                ></Input>
              </InputGroup>
            </FormControl>
            {/* <FormControl mb="20px" display="flex">
              <Checkbox {...register("company_is_new")}>
                Create new company
              </Checkbox>
            </FormControl> */}
            {/* {company_is_new && ( */}
              <FormControl mb="20px">
                <Text textAlign="left" mb="2.5px">
                  New company name
                </Text>
                <InputGroup color="black">
                  <InputLeftElement
                    children={<HiOutlineOfficeBuilding opacity={"0.2"} />}
                  />
                  <Input
                    {...register("new_company_name")}
                    type="text"
                    placeholder="Enter a Company"
                    _focus={{ border: "1px solid #007C8C" }}
                  ></Input>
                </InputGroup>
              </FormControl>
            {/* )} */}
            {/* {!company_is_new && (
              <FormControl mb="20px">
                <Text textAlign="left" mb="2.5px">
                  Select a Company
                </Text>
                <Select
                  {...register("company")}
                  placeholder="--Select a Company--"
                  cursor="pointer"
                >
                  {companies.map((company) => {
                    return (
                      <option key={company.id} value={company.id}>
                        {company.attributes.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            )} */}
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Password
              </Text>
              <InputGroup color="black">
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFiLock color="gray.300" />}
                />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  _focus={{ border: "1px solid #007C8C" }}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Profile Photo
              </Text>
              <InputGroup
                border="1px solid #E2E8F0"
                borderRadius="5px"
                p="2px 5px 2px 2px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  _focus={{ outline: "none" }}
                  _hover={{
                    background: "teal.600",
                  }}
                  color="white"
                  bg="teal.400"
                  borderRadius="5px"
                  onClick={() => {
                    filePicker.current.click();
                  }}
                >
                  {" "}
                  Choose Photo
                </Button>
                <Text htmlFor="file-upload" fontSize="12px" color="black.200">
                  {files ? files[0].name : "No file chosen"}
                </Text>
                <Input
                  type="file"
                  ref={filePicker}
                  display="none"
                  onChange={(e) => setFile(e.target.files)}
                />
              </InputGroup>
            </FormControl>
            <Flex justifyContent="space-between" alignItems="center">
              <Link to={"/"}>
                <Text _hover={{ color: "teal.600" }}>
                  Already have an account?
                </Text>
              </Link>
              <Button
                type="submit"
                color="white"
                borderRadius="10px"
                bg="teal.400"
                p="3px 20px"
                ml="10px"
                _hover={{ bg: "teal.600" }}
                _focus={{ outline: "none" }}
              >
                Register
              </Button>
            </Flex>
          </form>
          {error && (
            <Text color="red" textAlign="center" m="20px">
              {error}
            </Text>
          )}
          {duplicateEmail && (
            <Text color="red" textAlign="center" m="20px">
              {duplicateEmail}
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};
export default Register;
