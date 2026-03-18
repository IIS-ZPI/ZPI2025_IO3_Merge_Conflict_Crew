from abc import ABC, abstractmethod


class IArithmeticDiff(ABC):
    @abstractmethod
    def Difference(self,A: float,B: float) -> float:
        pass

class ArithmeticDiff(IArithmeticDiff):
    def Difference(self, A:float,B:float) -> float:
        return A - B