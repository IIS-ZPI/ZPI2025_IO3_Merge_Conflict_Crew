from abc import ABC, abstractmethod

class IArithmeticsDiv(ABC):
    @abstractmethod
    def division(self, a: float, b: float) -> float:
        pass

class ArithmeticDiv(IArithmeticsDiv):
    def division(self, a: float, b: float) -> float:
        if b == 0:
            raise ValueError("Dividing by zero is not allowed")
        return a / b