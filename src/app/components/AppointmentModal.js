import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Textarea,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleSubmit } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number is not valid"
    )
    .required(),
  address: yup.string().required(),
  summary: yup
    .string()
    .max(100, "Summary must be 100 characters or less")
    .required(),
});

export default function AppointmentModal({
  isOpen,
  onClose,
  selectedSlot,
  setAlert,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(formData) {
    try {
      const response = await fetch("/api/create-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: selectedSlot.start,
          end: selectedSlot.end,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          summary: formData.summary,
        }),
      });

      if (response.ok) {
        console.log("Appointment created successfully!");
        onClose();
        setAlert(0);
      } else {
        console.log("Failed to create appointment.");
        setAlert(1);
      }
    } catch (error) {
      console.error("Failed to create appointment:", error);
      setAlert(1);
    }
  }

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    await onSubmit({ ...formData, start: selectedSlot.start });
    setIsSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Appointment</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              {...register("phone")}
              placeholder="Enter your phone number"
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              {...register("address")}
              placeholder="Enter your address"
            />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.summary}>
            <FormLabel>Summary of you issue</FormLabel>
            <Textarea
              placeholder="Brief summary of the issue (100 characters or less)"
              resize="vertical"
              {...register("summary")}
            />
            <FormErrorMessage>
              {errors.summary && errors.summary.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit(handleFormSubmit)}
            isLoading={isSubmitting}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
