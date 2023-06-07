import * as RadixTooltip from '@radix-ui/react-tooltip';
import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

interface Props {
  text: string;
}

const Tooltip = ({ text }: Props) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild className="self-center">
          <button className="h-fit rounded-full bg-gray-700 text-gray-300 ring-2 ring-gray-500">
            <QuestionMarkIcon className="scale-75" />
          </button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content sideOffset={5}>
            <motion.div
              className="rounded-default bg-gray-700 p-2 text-sm text-gray-300 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
              initial={{ opacity: 0, translateY: -2 }}
              animate={{ opacity: 100, translateY: 0 }}
              transition={{ duration: 0.2 }}
            >
              {text}
              <RadixTooltip.Arrow className="fill-gray-700" />
            </motion.div>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
