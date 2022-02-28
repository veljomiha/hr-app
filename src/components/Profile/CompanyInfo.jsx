import {
  Flex,
  Box,
  Text,
  FormControl,
  InputGroup,
  Input,
  Button,
  Img,
} from "@chakra-ui/react";
import SideBar from "./SideBar";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../UserContext";
import { uploadUserPhoto } from "../../services/upload";
import { getProfileById } from "../../services/profile";
import { updateCompany, getCompanyById } from "../../services/company";

const CompanyInfo = () => {
  const filePicker = useRef(null);
  const [files, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  const [currCompany, setCompanyName] = useState("");
  const [idCompany, setIdCompany] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    getProfileById(user.id).then((response) => {
      setIdCompany(response.data.data[0].attributes.company.data.id);
      setCompanyName(
        response.data.data[0].attributes.company.data.attributes.name
      );
      if (idCompany) {
        getCompanyById(idCompany).then((response) => {
          setCompanyLogo(
            response.data.attributes.logo.data.attributes.url
          );
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCompany]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", files[0]);
    const uploaResponse = await uploadUserPhoto(formData);
    const data = { name: currCompany, logo: uploaResponse.data[0].id };
    const responseUpdate = await updateCompany(idCompany, data);
    setCompanyLogo(
      responseUpdate.data.data.attributes.logo.data.attributes.url
    );
    setCompanyName(responseUpdate.data.data.attributes.name);
  };

  return (
    <Flex
      minHeight="100vh"
      w="100vw"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box
        display="flex"
        bg="teal.400"
        minHeight={{ base: "70px", md: "100vh" }}
        w={{ base: "100%", md: "330px" }}
      >
        <SideBar />{" "}
      </Box>
      <Box w="100%">
        <Flex
          minHeight="10vh"
          justifyContent={{ base: "center", md: "flex-start" }}
          pl={{ base: "0", md: "20px" }}
          alignItems="center"
          borderBottom="1px solid #43b3ac"
        >
          <Text fontSize="28px">Company Info</Text>
        </Flex>
        <Flex
          minHeight="90vh"
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          {/* BASIC INFO  */}
          <Box
            bg="white"
            m="20px"
            mr={{ base: "", xl: "30px" }}
            p="30px 0"
            borderRadius="5px"
            fontSize="16px"
            boxShadow="xl"
            color="teal.400"
            textAlign="center"
            width={{ base: "300px", sm: "400px" }}
          >
            <Box p="20px 30px 0 30px">
              <FormControl mb="20px">
                <Text textAlign="left" mb="2.5px">
                  Company name
                </Text>
                <InputGroup color="black">
                  <Input
                    value={currCompany}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    placeholder={currCompany}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl mb="20px">
                <Text textAlign="left" mb="2.5px">
                  Company logo
                </Text>
                <InputGroup
                  border="1px solid #e2e8f0"
                  borderRadius="5px"
                  p="2px 5px 2px 2px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb="20px"
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
              <Button
                onClick={handleSubmit}
                color="white"
                borderRadius="10px"
                bg="teal.400"
                p="3px 40px"
                mt="20px"
                _hover={{ bg: "teal.600" }}
                _focus={{ outline: "none" }}
              >
                Save
              </Button>
            </Box>
            {companyLogo && (
              <Flex
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Text margin="20px 0 10px 0">Your company logo</Text>
                <Img
                  src={process.env.REACT_APP_API_URL + companyLogo}
                  width="200px"
                />
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CompanyInfo;
