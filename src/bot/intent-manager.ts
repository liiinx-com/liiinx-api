import intentHandlers from "./intent-handlers/index";
// import assets from "./assets";

const db = [
  {
    id: 11557,
    activeStepId: null,
    output: {},
    phone: "14375333235",
  },
];

//TYPES

interface User {
  id: number;
  name: string;
}

interface IncomingMessage {
  text: string;
  user: User;
}

const ERRORS = {
  STEP_NOT_FOUND: "STEP_NOT_FOUND",
  INVALID_INPUT: "INVALID_INPUT",
};

export class IntentManager {
  private STEP_ID_DELIMITER = ".";
  private NEW_LINE = "\n";
  private intentsMap = new Map();

  private async getUserActiveStepInfo(userId: number) {
    // TODO: get from db and if not existed in db then return fallback";
    const user = await this.getUserById(userId);
    return user?.activeStepId
      ? { activeStepId: user.activeStepId, isNewUser: false }
      : {
          activeStepId: await this.getFallbackIntentForUser(userId),
          isNewUser: true,
        };
  }

  private async getUserCurrentOutput(userId: number) {
    // TODO: get from db and if not existed in db then return fallback";
    const user = await this.getUserById(userId);
    return user.output;
  }

  async getUserById(userId: number) {
    return db.find((user) => user.id === userId);
  }

  async resetUserOutput(userId: number) {
    const user = await this.getUserById(userId);
    user.output = {};
  }

  loadAssets({ intentsObject }) {
    Object.keys(intentsObject)
      .map((key) => ({
        key,
        value: intentsObject[key],
      }))
      .forEach(({ key, value }) => this.intentsMap.set(key, value));
    console.log(`[i] ${this.intentsMap.size} intents loaded successfully `);
  }

  async updateUserActiveStepId(
    userId: number,
    { stepId = undefined, changes = undefined },
  ) {
    const user = await this.getUserById(userId);
    if (stepId) user.activeStepId = stepId;
    if (changes) user.output = { ...user.output, ...changes };
    return user;
  }

  private async getFallbackIntentForUser(userId: number) {
    return "hi.1";
    // return "newReturnOrder.1";
  }

  async getIntentAndHandlerByStepId(stepId: string) {
    if (!stepId) throw new Error(ERRORS.STEP_NOT_FOUND);

    const [intentKey] = stepId.split(this.STEP_ID_DELIMITER);

    if (this.intentsMap.has(intentKey)) {
      const intent = this.intentsMap.get(intentKey);

      const handler = intentHandlers[intentKey];
      return [intent, handler];
    }
    throw new Error(ERRORS.STEP_NOT_FOUND);
  }

  async processTextMessageForUserV2(
    userId: number,
    message: IncomingMessage,
  ): Promise<any> {
    const result = [];
    let inputConsumed = false;
    const { text: userInput } = message;

    do {
      // 1. get user active stepId
      const userActiveStepInfo = await this.getUserActiveStepInfo(userId);
      const { activeStepId: userActiveStepId, isNewUser } = userActiveStepInfo;
      if (isNewUser) inputConsumed = true;
      console.log("---", userActiveStepId);

      // 2. Get Handler Module
      const [, handlerModule] = await this.getIntentAndHandlerByStepId(
        userActiveStepId,
      );
      const {
        getStepTextAndOptionsByStepId,
        validate: validateFn,
        getNextStepFor,
        handleIntentComplete,
        requiresUserResponse,
      } = handlerModule;

      // 3. Get Step Text and Options for the Current Step
      const [currentStepText, currentStepOptions, stepKey] =
        await getStepTextAndOptionsByStepId(userActiveStepId, {
          message,
          isNewUser: userActiveStepInfo.isNewUser,
        });
      const currentStepResponse = {
        response:
          currentStepText +
          (requiresUserResponse
            ? "\n\n" + this.getOptionsTextFromOptions(currentStepOptions)
            : ""),
      };

      if (requiresUserResponse) {
        if (inputConsumed) {
          result.push(currentStepResponse);
          console.log("1", result);
          return result;

          // return [...result, currentStepResponse];
        } else {
          const { response: validatedResponse, ok: validationOk } =
            await this.validateInputForStep(
              currentStepOptions,
              stepKey,
              userActiveStepId,
              userInput,
              validateFn,
            );

          console.log("2");
          if (!validationOk) return [...result, currentStepResponse];
          // 3. Update user output for the current active step
          await this.updateUserActiveStepId(userId, {
            changes: validatedResponse,
          });
        }
      } else {
        result.push(currentStepResponse);
        console.log("3");
      }

      // 4. Check if intent is complete
      const { isIntentComplete, nextStep } = await getNextStepFor(
        userActiveStepId,
        { message },
      );

      // 5. Handle Intent Complete and set nextStep if completed
      let gotoNextStepId: string;
      if (isIntentComplete) {
        const userCurrentOutput = await this.getUserCurrentOutput(userId);
        const { gotoStepId } = await handleIntentComplete(
          userId,
          userCurrentOutput,
          { message },
        );
        gotoNextStepId = gotoStepId
          ? gotoStepId
          : await this.getFallbackIntentForUser(userId);
        await this.resetUserOutput(userId);
      } else {
        gotoNextStepId = nextStep.id;
      }

      await this.updateUserActiveStepId(userId, {
        stepId: gotoNextStepId,
      });
      inputConsumed = true;
    } while (true);
  }

  // async processTextMessageForUser(
  //   userId: number,
  //   message: IncomingMessage,
  // ): Promise<any> {
  //   const result = [];
  //   // const result = { response: "sample text" };
  //   const { text: userInput } = message;
  //   const userActiveStepInfo = await this.getUserActiveStepInfo(userId);
  //   const { activeStepId: userActiveStepId } = userActiveStepInfo;

  //   console.log("xxxis New User", userActiveStepInfo.isNewUser);

  //   // 1. Get Handler Module
  //   const [, handlerModule] = await this.getIntentAndHandlerByStepId(
  //     userActiveStepId,
  //   );
  //   const {
  //     getStepTextAndOptionsByStepId,
  //     getNextStepFor,
  //     handleIntentComplete,
  //     validate: validateFn,
  //   } = handlerModule;

  //   const [currentStepText, currentStepOptions, stepKey] =
  //     await getStepTextAndOptionsByStepId(userActiveStepId, {
  //       message,
  //       isNewUser: userActiveStepInfo.isNewUser,
  //     });

  //   //-------if options.length > 0 ----------------
  //   // 2. Input Validation
  //   const { response: validatedResponse, ok: validationOk } =
  //     await this.validateInputForStep(
  //       currentStepOptions,
  //       stepKey,
  //       userActiveStepId,
  //       userInput,
  //       validateFn,
  //     );

  //   if (!validationOk) {
  //     const invalidResponseResult = { response: currentStepText };
  //     const optionsText = this.getOptionsTextFromOptions(currentStepOptions);
  //     if (optionsText) {
  //       invalidResponseResult.response =
  //         invalidResponseResult.response +
  //         this.NEW_LINE +
  //         this.NEW_LINE +
  //         optionsText;
  //     }
  //     return [invalidResponseResult];
  //   }

  //   // 3. Update user output of the current active step
  //   await this.updateUserActiveStepId(userId, {
  //     changes: validatedResponse,
  //   });
  //   //-------if options.length > 0 ----------------

  //   // 4. Check if intent is complete
  //   const { isIntentComplete, nextStep } = await getNextStepFor(
  //     userActiveStepId,
  //     { message },
  //   );

  //   // 5. Get nextStep
  //   let gotoNextStepId: string;
  //   if (isIntentComplete) {
  //     const userCurrentOutput = await this.getUserCurrentOutput(userId);
  //     const { gotoStepId } = await handleIntentComplete(
  //       userId,
  //       {
  //         ...userCurrentOutput,
  //         ...validatedResponse,
  //       },
  //       { message },
  //     );

  //     gotoNextStepId = gotoStepId
  //       ? gotoStepId
  //       : await this.getFallbackIntentForUser(userId);

  //     // 6. Reset User output
  //     await this.resetUserOutput(userId);
  //   } else gotoNextStepId = nextStep.id;

  //   // 7. Update User Active StepId
  //   await this.updateUserActiveStepId(userId, {
  //     stepId: gotoNextStepId,
  //   });

  //   // 8. get next Module Handler
  //   const [, nextHandlerModule] = await this.getIntentAndHandlerByStepId(
  //     gotoNextStepId,
  //   );
  //   const {
  //     getStepTextAndOptionsByStepId: getStepTextAndOptionsByStepIdForNextModule,
  //   } = nextHandlerModule;

  //   const [nextStepText, nextStepOptions] =
  //     await getStepTextAndOptionsByStepIdForNextModule(gotoNextStepId, {
  //       message,
  //     });

  //   result.push({
  //     response:
  //       nextStepText +
  //       this.NEW_LINE +
  //       this.NEW_LINE +
  //       this.getOptionsTextFromOptions(nextStepOptions),
  //   });

  //   return result;
  // }

  private async handleCompleteAndGetNextStepId({
    handleIntentCompleteFn,
    userId,
    validatedResponse,
    message,
  }) {
    const userCurrentOutput = await this.getUserCurrentOutput(userId);
    const { gotoStepId } = await handleIntentCompleteFn(
      userId,
      {
        ...userCurrentOutput,
        ...validatedResponse,
      },
      { message },
    );

    return gotoStepId
      ? gotoStepId
      : await this.getFallbackIntentForUser(userId);
  }

  private getOptionsTextFromOptions(options: any) {
    return options
      .map(({ numericValue, label }) => `${numericValue}. *${label}*`)
      .join(this.NEW_LINE);
  }

  async validateInputForStep(
    stepOptions: any,
    stepKey: string,
    stepId: string,
    value: string,
    validateFn: any,
  ) {
    const result = {
      ok: true,
      response: {},
      errorCode: undefined,
    };
    if (stepOptions.length === 0) {
      const stepValidationResult = await validateFn(stepId, value, {
        stepKey,
        stepOptions,
      });
      if (stepValidationResult.ok)
        return {
          ...result,
          response: {
            [stepKey]: value,
          },
        };
    }

    const validValues = stepOptions.map(({ numericValue }) => numericValue);
    if (!validValues.includes(value.toString()))
      return {
        ok: false,
        errorCode: ERRORS.INVALID_INPUT,
        response: null,
      };

    const selectedOption = stepOptions.find(
      ({ numericValue }) => numericValue === value.toString(),
    );

    return {
      ...result,
      response: {
        [stepKey]: selectedOption.value,
      },
    };
  }
}

// const main = async () => {
//   const manager = new IntentManager();
//   manager.loadAssets({ intentsObject: assets.intents });
//   const responses = await manager.processTextMessageForUserV2(11557, {
//     user: { id: 11557, name: "Amir Mohsen" },
//     text: "hi",
//   });
// };

// main().then((res) => {
//   console.log("***DONE***");
//   console.log(res);
// });
