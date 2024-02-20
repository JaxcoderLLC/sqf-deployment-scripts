export const superAppFactoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_strategy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_host",
        type: "address",
      },
      {
        internalType: "contract ISuperToken",
        name: "_acceptedToken",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_activateOnCreated",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_activateOnUpdated",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_activateOnDeleted",
        type: "bool",
      },
      {
        internalType: "string",
        name: "_registrationKey",
        type: "string",
      },
    ],
    name: "createRecipientSuperApp",
    outputs: [
      {
        internalType: "contract RecipientSuperApp",
        name: "recipientSuperApp",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
