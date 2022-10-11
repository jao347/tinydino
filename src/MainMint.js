import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import { Box, Button, Flex, Input, Text} from '@chakra-ui/react';

import tinyDinoNFT from './TinyDinoNFT.json';

const tinyDinoNFTAddress = "0x1257d8a43B721270FcC3fc641135E4DF5aCb7fad";

const MainMint = ({ accounts, setAccount}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                tinyDinoNFTAddress,
                tinyDinoNFT.abi,
                signer
            );
            try{
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            }
            catch(err){
                console.log("error: ", err);
            }
        }
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="450px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">TinyDino</Text>
                    <Text fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">
                        Did you know dinosaurs still roam the earth?
                        A small but mighty bird declares it is a dinosaur! But no one believes that dinosaurs still exist.
                        Mint TinyDino to find out.
                    </Text>
                </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#FF731D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleDecrement}>-</Button>
                        <Input
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                             type="number" value={mintAmount} />
                        <Button 
                            backgroundColor="#FF731D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleIncrement}>+</Button>
                    </Flex>
                        <Button 
                            backgroundColor="#FF731D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px" onClick={handleMint}> Mint Now</Button>
                </div>
            ) : (
                <p>
                    Please connect wallet.
                </p>
            )}
            </Box>
        </Flex>

     
    )
}

export default MainMint;