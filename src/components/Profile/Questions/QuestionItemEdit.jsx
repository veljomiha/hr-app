import { useEffect, useRef } from "react";
import { Flex, Box, Button, Input } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const QuestionItemEdit = (props) => {
  const navigate = useNavigate();
  const question = props.question;
  const id = question.id;
  const type = question.attributes.type;
  const {
    editingQuestionId,
    editingQuestionsInputs,
    handleChangeEditingQuestions,
    handleSave,
  } = props;

  const inputRef = useRef();

  useEffect(() => {
    if (editingQuestionId === id) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }
  });

  let inputValue = "";
  if (editingQuestionsInputs[id]) {
    inputValue = editingQuestionsInputs[id];
  }

  return (
    <Flex
      bg="white"
      mt="20px"
      p="30px"
      borderRadius="5px"
      fontSize="16px"
      boxShadow="xl"
      width={{ base: "300px", sm: "400px" }}
      flexDirection="column"
    >
      <Flex flexDirection="column">
        <Box fontWeight="bold" mb="15px">Question - {type}</Box>
        <Input
          ref={inputRef}
          type="text"
          // variant="unstyled"
          value={inputValue}
          onChange={(e) => {
            handleChangeEditingQuestions(e, id);
          }}
        />
      </Flex>

      <Flex alignItems="center" justifyContent="flex-end" mt="15px">
        <Button
          onClick={(e) => {
            handleSave(id);
          }}
          color="white"
          borderRadius="10px"
          bg="teal.400"
          p="3px 10px"
          _hover={{ bg: "teal.600" }}
          _focus={{ outline: "none" }}
        >
          Save
          <CheckIcon marginLeft="8px" />
        </Button>
        <Button
          onClick={(e) => {
            navigate("/questions");
          }}
          color="white"
          ml="5px"
          borderRadius="10px"
          bg="red.400"
          p="3px 10px"
          _hover={{ bg: "red.600" }}
          _focus={{ outline: "none" }}
        >
          Cancel
          <CloseIcon marginLeft="8px" w="13px" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuestionItemEdit;
