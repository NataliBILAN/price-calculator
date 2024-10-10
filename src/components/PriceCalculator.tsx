import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  Tab,
  Tabs,
  TabList,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import {
  fetchContainerSizes,
  fetchShipmentTypes,
} from "../utils/fetch-form-data";
import { FormData, PriceData } from "../types";
import { ReactComponent as CircleDotSolid } from "../icons/circle-dot-solid.svg";
import { ReactComponent as Delivery } from "../icons/delivery.svg";
import { ReactComponent as FlagCheckedSolid } from "../icons/flag-checkered-solid.svg";

const PriceCalculator = () => {
  const {
    data: containerSizes,
    error: containerError,
    isLoading: containerLoading,
  } = useQuery("containerSizes", fetchContainerSizes, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const {
    data: shipmentTypes,
    error: shipmentError,
    isLoading: shipmentLoading,
  } = useQuery("shipmentTypes", fetchShipmentTypes, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const [formData, setFormData] = useState<FormData>({
    size: "",
    type: shipmentTypes ? shipmentTypes[1] : "export", // default to "Export"
    locations: {
      start: "",
      delivery: "",
      end: "",
    },
  });

  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(false);

  const isDisabledSubmitButton =
    !formData.size ||
    !formData.type ||
    !formData.locations.start ||
    !formData.locations.delivery ||
    !formData.locations.end;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const keys = name.split(".");

    if (keys.length > 1) {
      const [group, field] = keys as ["locations", keyof FormData["locations"]];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [group]: {
          ...prevFormData[group],
          [field]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTabChange = (index: number) => {
    const type = index === 0 ? shipmentTypes[0] : shipmentTypes[1];
    setFormData({
      ...formData,
      type,
    });
  };

  const handleSizeChange = (value: string) => {
    setFormData({
      ...formData,
      size: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/`, {
        size: formData.size,
        type: formData.type,
        locations: {
          start: formData.locations.start,
          delivery: formData.locations.delivery,
          end: formData.locations.end,
        },
      });
      setPrice(response.data);
    } catch (error) {
      console.error("Error fetching price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="803px"
      p="defaultPadding"
      borderRadius="defaultRadius"
      boxShadow="boxShadow"
    >
      <Text as="h3" textStyle="h3" mb={5}>
        Price Calculator
      </Text>

      <Text textStyle="p" mb={5}>
        Market price insight with the UTURN price calculator. Provide your
        shipment details and get objective data-based insights in price.
      </Text>

      <form onSubmit={handleSubmit}>
        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          gap={6}
          mb={6}
        >
          <Box flex="1">
            {shipmentLoading ? (
              <Box>Loading...</Box>
            ) : (
              <FormControl mb={4}>
                <Text textStyle="h5" mb={4}>
                  Type of transport
                </Text>
                <Tabs
                  onChange={handleTabChange}
                  defaultIndex={1}
                  variant="enclosed"
                  mb={5}
                >
                  <TabList borderBottom="none">
                    {shipmentTypes.map((type: string, index: number) => (
                      <Tab
                        key={type}
                        value={type}
                        defaultValue={1}
                        _selected={{ color: "white", bg: "brand.secondary" }}
                        paddingTop="7px"
                        paddingBottom="7px"
                        width="100%"
                        border="1px"
                        borderColor="brand.secondary"
                        color="brand.secondary"
                        textTransform="capitalize"
                        borderTopLeftRadius={
                          index === 0 ? "defaultRadius" : "0"
                        }
                        borderBottomLeftRadius={
                          index === 0 ? "defaultRadius" : "0"
                        }
                        borderTopRightRadius={
                          index === shipmentTypes.length - 1
                            ? "defaultRadius"
                            : "0"
                        }
                        borderBottomRightRadius={
                          index === shipmentTypes.length - 1
                            ? "defaultRadius"
                            : "0"
                        }
                      >
                        {type}
                      </Tab>
                    ))}
                  </TabList>
                </Tabs>
              </FormControl>
            )}

            {containerLoading ? (
              <Box>Loading...</Box>
            ) : (
              <FormControl as="fieldset" mb={4}>
                <FormLabel as="legend" mb={5}>
                  <Text textStyle="h5">Container size</Text>
                </FormLabel>
                <RadioGroup onChange={handleSizeChange} value={formData.size}>
                  <SimpleGrid columns={2} spacing={4}>
                    {" "}
                    {containerSizes.map((size: string) => (
                      <Radio key={size} value={size}>
                        <Text
                          textTransform={
                            size.length > 4 ? "capitalize" : "uppercase"
                          }
                        >
                          {size}
                        </Text>
                      </Radio>
                    ))}
                  </SimpleGrid>
                </RadioGroup>
              </FormControl>
            )}
          </Box>

          <Box display={{ base: "none", md: "block" }}>
            <Divider orientation="vertical" />
          </Box>

          <Box flex="1">
            <Text textStyle="h5" mb={4}>
              Trip
            </Text>
            <Box pl="45px">
              <FormControl mb={4}>
                <FormLabel fontSize="14px" mb={0}>
                  Start location
                </FormLabel>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left="-35px"
                    top="50%"
                    transform="translateY(-50%)"
                  >
                    <CircleDotSolid />
                  </Box>
                  <Input
                    name="locations.start"
                    value={formData.locations.start}
                    onChange={handleInputChange}
                    maxW="300px"
                    borderColor="brand.grey"
                    borderRadius="defaultRadius"
                    h="30px"
                  />
                </Box>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel fontSize="14px" mb={0}>
                  Delivery location
                </FormLabel>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left="-48px"
                    top="50%"
                    transform="translateY(-50%)"
                  >
                    <Delivery />
                  </Box>
                  <Input
                    name="locations.delivery"
                    value={formData.locations.delivery}
                    onChange={handleInputChange}
                    maxW="300px"
                    borderColor="brand.grey"
                    borderRadius="defaultRadius"
                    h="30px"
                  />
                </Box>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel fontSize="14px" mb={0}>
                  End location
                </FormLabel>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left="-35px"
                    top="50%"
                    transform="translateY(-50%)"
                  >
                    <FlagCheckedSolid />
                  </Box>
                  <Input
                    name="locations.end"
                    value={formData.locations.end}
                    onChange={handleInputChange}
                    maxW="300px"
                    borderColor="brand.grey"
                    borderRadius="defaultRadius"
                    h="30px"
                  />
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Flex>

        <Divider mb={6} width="calc(100% + 30px)" ml="-15px" />

        <Box textAlign="right">
          <Button
            type="submit"
            colorScheme="brand"
            bg="brand.primary"
            _hover={{ bg: "brand.secondary" }}
            isDisabled={isDisabledSubmitButton}
          >
            {loading && <Spinner size="sm" />} Request price
          </Button>
        </Box>
      </form>

      {price && (
        <Box>
          <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
            Price Summary
          </Text>

          <Stack spacing={4}>
            <Box>
              <Text fontSize="md" fontWeight="bold">
                Minimum Price:
              </Text>
              <Text>{price?.min ?? "N/A"}</Text>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="bold">
                Maximum Price:
              </Text>
              <Text>{price?.max ?? "N/A"}</Text>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="bold">
                Average Price:
              </Text>
              <Text>{price?.average ?? "N/A"}</Text>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PriceCalculator;
