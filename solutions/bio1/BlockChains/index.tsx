﻿import { SCodeBlock, SText, STitle, SList} from "components";

export const BlockChains = () => {
    return (
        <>
            <STitle>Observation</STitle>
            <SText>
                A straightforward way to solve this problem is to generate all possible permutations of the blocks and then filter out those that violate the no-three-in-order condition.
                Specifically, we would:
            </SText>
            <SList>
                <SText> Generate all possible permutations of the remaining letters that could follow the prefix $p$.</SText>
                <SText> Check each permutation to see if it contains any three letters in alphabetical order. </SText>
                <SText> Count and return the number of permutations that are valid. </SText>
            </SList>
            <SText>
                However, this approach quickly becomes too slow as $l$ increases.
                One way to optimise is generate permutations letter by letter, and discard permutations as soon as the no-three-in-order condition is broken.
                Again however, this is not enough for a full solution.
            </SText><SText>
                The key insight is that when constructing permutations, we only care about the sequences of letters in alphabetical order in the prefix, and of those, for each length of sequence,
                the one with the lexicographically smallest ending letter. We will store the ending letters of such sequences of lengths $1$ and $2$ as $(a, b)$, where $a$ is the lexicographically smallest
                ending letter for a sequence of length $1$, and $b$ for length $2$.
            </SText>

            <STitle>Solution</STitle>
            <SText> There are three parts to the problem that we need to implement. </SText>
            <SText>
                1. Track the Longest Alphabetical Sequence: While building the block-chain, maintain and update the $(a, b)$ pair as described above.
                To do this, we check each new letter $l$ against the two letters in the current longest sequence, $a$ and $b$:
                <SList>
                    <SText>If $l$ is lexicographically after $b$, we have a sequence of three letters in alphabetical order. The no-three-in order condition is broken, end search in this chain. </SText>
                    <SText>If $l$ is lexicographically after $a$ but before $b$, we can update $b$ with $l$, creating a new sequence of length $2$ $(a,l)$ with the smallest possible letters in alphabetical order. </SText>
                    <SText>If $l$ is lexicographically before $a$, we cannot improve on the sequence of length $2$, but we now have a sequence of length $1$ with $l$ as the smallest possible letter.
                        We update $a$ to $l$, and $b$ remains unchanged.  </SText>
                </SList>
            </SText><SText>
                2. Recursive Construction: Given the prefix $p$, for each remaining letter $c$ not yet in the block-chain:
            </SText>
            <SList>
                <SText>Add $c$ to the current chain. </SText >
                <SText> Check if this new chain has formed an invalid sequence. </SText>
                <SText> If it is valid, recursively attempt to add more blocks. </SText>
            </SList>
            <SText>
                3. Memoization: To avoid recomputing results for the same subproblems (such as the same set of remaining blocks with the same longest alphabetical sequence),
                store these results and reuse them as needed.
            </SText><SText>
                Finally, initiate the recursive process with the given prefix $p$, building valid block-chains by adding one letter at a time from the remaining letters.
                The final answer is the count of all valid block-chains generated by this process.
            </SText>

            <STitle>Code</STitle>
            <SCodeBlock path="BlockChains/sol" />
        </>
    );
};