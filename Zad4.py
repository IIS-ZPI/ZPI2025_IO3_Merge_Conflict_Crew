from abc import ABC, abstractmethod



class IArithmeticDiff(ABC):
    @abstractmethod
    def Difference(self,A: float,B: float) -> float:
        pass

class ArithmeticDiff(IArithmeticDiff):
    def Difference(self, A:float,B:float) -> float:
        return A - B

class IArithmeticsAdd(ABC):
    @abstractmethod
    def Addition(self, A: float, B: float) -> float:
        pass

class ArithmeticsAdd(IArithmeticsAdd):
    def Addition(self, A: float, B: float) -> float:
        return A + B

