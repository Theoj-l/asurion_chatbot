"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  ColorModeProvider,
  ColorModeProviderProps,
} from "@/components/ui/color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* To have dark mode */}
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
