import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ArrowUpDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const QuestionItem = (props) => {
  const navigate = useNavigate();
  const question = props.question;
  const id = question.id;
  const type = question.attributes.type;
  const { originalIndex, setEditingQuestionId, handleDelete } = props;

  return (
    <Flex
      d="flex"
      alignItems="center"
      m="5px 10px"
      p="10px"
      bg="white"
      borderRadius="5px"
      fontSize="16px"
      boxShadow="xl"
      className="drag-me-area dnd-item"
      flexDirection={{base:"column", sm:"row"}}
    >
      <Flex w={{base:"auto", sm:"100%"}} flexDirection="column" >
        <Flex alignItems="center" textAlign={{base:"center",sm:"left"}}mb={{base:"15px" , sm:"0"}}>
          <ArrowUpDownIcon cursor="pointer" className="drag-me-area" mr="10px" />
          <Box>
            <Box fontWeight="bold" className="drag-me-area">
              Question {originalIndex + 1} - {type}
            </Box>
            <Box>{question.attributes.text}</Box>
          </Box>
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <Button
          onClick={(e) => {
            setEditingQuestionId(id);
            navigate("/questions/edit/" + id);
          }}
          color="white"
          borderRadius="10px"
          bg="teal.400"
          p="3px 20px"
          _hover={{ bg: "teal.600" }}
          _focus={{ outline: "none" }}
        >
          Edit
          <EditIcon marginLeft="8px" />
        </Button>
        <Button
          onClick={(e) => {
            handleDelete(id);
          }}
          color="white"
          borderRadius="10px"
          bg="red.400"
          p="3px 20px"
          ml="5px"
          _hover={{ bg: "red.600" }}
          _focus={{ outline: "none" }}
        >
          Delete
          <DeleteIcon marginLeft="5px" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuestionItem;
